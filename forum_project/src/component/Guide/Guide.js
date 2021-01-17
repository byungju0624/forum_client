import { useState } from 'react';
import '../../css/Guide/Guide.css';  
import { firestore } from "../../firebase";
import { storage} from "../../firebase";

function Guide() {

	const [comment, setComment] = useState("");
	const [finish, setFinish] = useState(false);
	const [host, setHost] = useState("");
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [party, setParty] = useState(0);
	const [signed, setSigned] = useState(0);
	const [skill, setSkilled] = useState([]);
	const [term, setTerm] = useState("");
	
	//하나의 기술 문자열을 담기 위한 샅애
	const [eachSkill, setEachSkill] = useState("");

	//이미지를 받기 위해 필요한 상태
	const [getImage, setGetImage] = useState("")

	//이미지를 업로드 하기 위한 상태들
	const allInputs = {imgUrl : ''}
	const [imageAsFile, setImageAsFile] = useState('')
	const [imageAsUrl, setImageAsUrl] = useState(allInputs)

	console.log(imageAsFile)

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

	let handleImageAsFile = (e) => {
		const image = e.target.files[0]
		setImageAsFile(imageFile => (image))
	}

	let handleFireBaseUpload = e => {
		e.preventDefault()
		console.log('이미지 업로드를 시작합니다')
		if(imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/project/${imageAsFile.name}`).put(imageAsFile)
		//나중에 저 project 부분을 아이디로 바꾸자
		uploadTask.on('state_changed', 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, () => {
      storage.ref('project').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
				 setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
				 //이 밑으로 이미지를 넣어보자
				 console.log("유알엘이 뭔지 확인해볼거야"+fireBaseUrl)
				 console.log("사진이름이 뭔지 확인해볼거야"+imageAsFile.name)
				 firestore.collection("project").doc(imageAsFile.name).update({
					 image : fireBaseUrl
				 }).then(function(){
					 console.log('파이어베이스 업데이트 완료 이미지 url 파이어스토어에 업로드')
				 }).catch(function (err){
					 alert(err)
				 })
       })
    })
	}

	let getFireBaseImage = (image) => {
		storage.ref('project').child(`${image}.png`).getDownloadURL().then((url) => {
			setGetImage(url)
		}).catch((error) => {
			console.log('이미지를 받아오지 못했습니다.')
		})
	}

	getFireBaseImage('kurt')

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
			<div>
				<form onSubmit={handleFireBaseUpload}>
					<input type="file" accept="image/png          " onChange={handleImageAsFile}/>
					<button>이미지 업로드</button>
				</form>
			</div>
			<div>
				<img src={getImage}/>
			</div>
		</div>
  );
}

export default Guide;