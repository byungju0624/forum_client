import React from "react";
import styles from "../../css/MyPage/RegistStatus.module.css";
import firebase from "firebase/app";
import { firestore } from "../../firebase";

const RegistStatus = (props) => {

  let user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }
  console.log('현재 유저 데이터:', user)
  let submitted;

  //db에서 데이터를 읽어오기 위한 부분
  // function delay(ms) {
  //   return new Promise((resolve, reject) => {
  //     //promise 객체 반환, async도 promise를 다루는 기술이란 것을 잊지 말것
  //     setTimeout(resolve, ms);
  //   });
  // }

	// let getUserData = (account) => {
	// 	firestore.collection("users").doc("chejg7@gmail.com").get().then(async function(doc){
	// 		if(doc.exists){
	// 			submitted = doc.data();
	// 			console.log("가져온 친구는 다음과 같습니다"+submitted)
	// 		}else{
	// 			console.log('문서가 존재하지 않습니다')
	// 		}
	// 	})
	// }
	//----------------------------------------------------------------------------------

	// let handleApprove = async() => {
	// 	getUserData(email);
	// 	await delay(800)
	// 	console.log("등록현황은 다음과 같음"+submitted)
  //   await firestore.collection("users").doc(email).update({
  //     submittedProject : firebase.firestore.FieldValue.arrayUnion({applicant:account,project:name})
  //   })
  //   await firestore.collection("users").doc(account).update({
  //     appliedProject : firebase.firestore.FieldValue.arrayUnion(name)
  //   })
  //   await delay(1500)
  //   alert("승인에 성공했습니다.")
  //   window.location.reload();
	// }

  // const handleApprove = (e) => {
  //   let targetValue = e.target.value.split(',')
  //   console.log(targetValue)
  //   let projectName = targetValue[0];
  //   let userEmail = targetValue[1];
  //   console.log('프로젝트명:', projectName, '유저 이메일:', userEmail)
  //   //유저데이터
  //   let userData = firestore
  //   .collection("users")
  //   .doc(userEmail).get()
  // }

  // const handleReject = () => {

  // }

  let userData = firestore.collection("users").doc("chejg7@gmail.com")
  userData.get().then(function(doc){
    if(doc.exists){
      submitted = doc.data();
      console.log("가져온 친구는 다음과 같습니다"+submitted)
    }else{
      console.log('문서가 존재하지 않습니다')
    }
  })

  return (<div>등록된 정보는 다음과 같습니다: {submitted}</div>);
  // return (
  //   <div className={styles.header}>
  //     {submittedProject.map((el) => {
  //       let projectName = Object.keys(el)[0]
  //       return (<div>
  //       <div>프로젝트명:{projectName}</div>
  //       <div>신청자:{el[projectName].map((data) => {
  //         return (<div>
  //           {data}
  //           <button value={[projectName, data]} onClick={handleApprove}>승인</button>
  //           <button value={data} onClick={handleReject}>거부</button>
  //         </div>)
  //       })}</div>
  //       </div>)
  //     })}
  // </div>)
};

export default RegistStatus;
