import { useState } from 'react';
import '../../css/Guide/Guide.css';  
import { firestore } from "../../firebase";

function Guide() {

	/*const [projectData, updateData] = useState({
		객체넣기 -> ...spray로 뿌려주어야 함 
	})*/
	const [comment, setComment] = useState("");
	const [finish, setFinish] = useState(false);
	const [host, setHost] = useState("");
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [party, setParty] = useState(0);
	const [signed, setSigned] = useState(0);
	const [skill, setSkilled] = useState([]);
	const [term, setTerm] = useState("");
	
	
	const [eachSkill, setEachSkill] = useState("");


	let readDatabase = () =>{//데이터베이스 read
		firestore.collection("project").doc("떡상가즈아").get().then(function (data) {
			if(data){
				console.log("데이터베이스에 접속을 하였습니다.")
				console.log("부처님처럼의 정보는 다음과 같습니다 : "+JSON.stringify(data.data()))
			}else{
				console.log("문서가 존재하지 않습니다")
			}
		}).catch(function(err){
			console.log("발생한 에러는 다음과 같습니다 : "+err)
		})
	}

	let createDatabase = () => {
		firestore.collection("project").doc(name).get().then(function(docName){
			if(docName.data() !== undefined){
			  alert("중복된 프로젝트명입니다. 다른 프로젝트 이름을 정해주세요")
			}else{
				firestore.collection("project").doc(name).set({
					'comment' : comment,
					'finish' : finish,
					'name' : name,
					'party' : party,
					'signed' : signed,
					'skill' : skill,
					'term' : term 
				}).then(function(){
					console.log("등록성공")
				}).catch(function(error){
					console.log("다음과 같은 에러가 발생했습니다 : "+error)
				})
			}
		})
	}

	let skillbutton = () => {
		if(skill.length > 2){
			alert("기술 스택은 3개까지만 넣을 수 있어용~")
		}else{
			if(skill.includes(eachSkill.toLowerCase())===false){
				setSkilled(skill.concat(eachSkill.toLowerCase()))
				setTerm("")
			}else{
				alert("중복된 기술이에용~")
			}
		}
	}

  return (
    <div className="Guide">
      가이드가 나와야 합니다.
			<div>
				<button onClick={()=>{readDatabase()}}>파이어베이스 데이터 받아오기</button>
			</div>
			<div>
				<p>프로젝트 요약 : <input type="text" value={comment} onChange={e=>setComment(e.target.value)}></input></p>
				<p>프로젝트 이름 : <input type="text" value={name} onChange={e=>setName(e.target.value)}></input></p>
				<p>모집인원 : <input type="number" value={party} onChange={e=>setParty(e.target.value)}></input></p>
				<p>현재 등록 인원 : <input type="number" value={signed} onChange={e=>setSigned(e.target.value)}></input></p>
				<p>프로젝트 기간 : <input type="date" value={term} onChange={e=>setTerm(e.target.value)}></input></p>
			</div>
			<div>
				기술 스택 : <input type="text" value={eachSkill} onChange={e=>setEachSkill(e.target.value)}></input>
				<button onClick={skillbutton}>클릭</button>
				<p>기술스택1 : {skill[0]}</p>
				<p>기술스택1 : {skill[1]}</p> 
				<p>기술스택1 : {skill[2]}</p>  
			</div>
			<div>
				<button onClick={createDatabase}>데이터베이스에 등록하기</button>
			</div>
		</div>
  );
}

export default Guide;