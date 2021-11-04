import logo from './logo.svg';
import './App.css';
import React,{Component,Fragment} from "react";
import axios from "axios";
// 클래스형
// 함수 => Hooks => Redux => webPack (배포판) => 클라이언트 영역 (View) <=> 서버 (공용 : XML,JSON)
/*
   1. public : js,css,image,html => root
   2. src : JavaScript (.js) => 이벤트 제어 ...(데이터를 받아서 출력)
   3. package.json : 라이브러리 추가 (pom.xml)

      => 1) public < index.html => 기본 코딩 (container를 잡는다) => React에서 생성된 HTML을 어디에 출력할 지 지정
           el
         2) JS(React)
            = 변수 선언  constructor(props) => this.state={변수선언}
            = 데이터를 서버로부터 받는다 componentDidMount() => axios.get()
            = 받은 데이터 출력 : render()
            = function() => Hooks
            = Redux(MVC)
            = vue => vuex(MVC)
 */
class App extends Component{
    // 변수 선언
    constructor(props) {
      super(props);
      // 변수(멤버)  data:{}
      this.state={
          curpage:1,  // 현재 페이지
          totalpage:0, // 스프링에서 받는다
          recipe_data:[], // List(20)
          recipe_detail:{}, // VO
          count:0
      }
      // 이벤트 등록 (이전/다음)
    }
    // 서버연결 데이터를 읽기
    // mounted:function(){}
    componentDidMount() {
        axios.get("http://localhost:8080/web/recipe/rest_list.do",{
          params:{
              page:this.curpage
          }
        }).then(response=>{
           console.log(response.data);
           this.setState({recipe_data:response.data,
               totalpage:response.data[0].totalpage,count:response.data[0].count}) // render()호출

        })
    }

    // HTML을 출력
   render() {
        // map => forEach
        // for(RecipeVO vo:list)  => 형식 (XML) => 여느 태그와 닫는 태그가 명확하다
        // <input/> <br/> <img/>
        let html=this.state.recipe_data.map((recipe)=>
            <div className="col-md-3">
                <div className="thumbnail">
                        <img src={recipe.poster} alt="Lights" style={{"width":"100%"}}/>
                            <div className="caption">
                                <p>{recipe.title}</p>
                                <p>{recipe.chef}</p>
                            </div>

                </div>
            </div>
        )
      return (
          <Fragment>
           <div className={"row"}>
             <h2>총 <span style={{"color":"green"}}>{this.state.count}</span>개의 맛있는 레시피가 있습니다.</h2>
             <hr/>
             {html}
           </div>
           <div className={"row"}>
             <div className={"text-center"}>
                 <button className={"btn btn-sm btn-danger"}>이전</button>
                 {this.state.curpage} page / {this.state.totalpage} pages
                 <button className={"btn btn-sm btn-success"}>다음</button>
             </div>
           </div>
          </Fragment>
      )
   }
}
export default App;
