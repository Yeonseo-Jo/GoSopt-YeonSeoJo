# 💡 React 프로젝트의 폴더구조는 어떻게 설계하는것이 좋을까? 💡

<br/>

# 📍 Presentation Component - Container Component ↔ Custom hook ↔ Atomic를 비교해보자!

## **1. Presentation Component - Container Component**

- 데이터를 출력하여 화면을 표현하는 부분인 `Presentational Component`와 데이터를 처리하는 부분인 `Container Component`로 나눠서 개발하는 패턴이다.
- hook의 개념이 존재하지 않았던 이전에, 로직과 view를 분리하기 위한 방법으로 등장했다.

<br/>

### &nbsp; - **Presentation Component**

- 예시 (출처: [gist](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c))

```js
// CommentListPresenter.js
import React from "react";

const Commentlist = (comments) => (
  <ul>
    {comments.map(({ body, author }) => (
      <li>
        {body}-{author}
      </li>
    ))}
  </ul>
);
```

- 받은 prop을 기반으로 render한다.
- html, css 등 DOM 마크업과 스타일을 담당한다. (UI)
- app에 대해 완전히 몰라야한다
- UI에 관련된 상태만 가질 수 있다.
- 작은 레고 블럭처럼 가능한 작게 만들어야 한다.

### &nbsp; - **Container Component**

- 예시 (출처: [gist](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c))

```js
// CommentListContainer.js
import React from "react";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] };
  }

  componentDidMount() {
    fetch("/my-comments.json")
      .then((res) => res.json())
      .then((comments) => this.setState({ comments }));
  }

  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```

- markup 없이 데이터만 다루고, presenter에게 prop으로 내린다.
- 어떠한 동작을 할 것인가에 대해 담당한다.
- side effect를 만들 수 있다.
- 주로 상태를 가지고 있다.

<br/>

### &nbsp; - 장단점

- 장점
  - 관심사의 분리를 더 잘 할 수 있다.
  - 재사용성을 높일 수 있다.
  - Markup 작업이 편하다.
- 단점
  - conainer 컴포넌트를 분리할수록 파일의 개수가 증가한다
  - 불필요한 depth가 추가된다.
  - props를 단번에 파악하기 어렵다.

<br/>
<hr>

## **2. Custom Hook**

![image](https://user-images.githubusercontent.com/77691829/232971853-3d007d81-e5cc-4a9b-948d-fd651e5d0656.png)

- `Presentation-Container 패턴`에서 로직을 **Hook으로 관리하는 디자인 패턴이다.**
- 메인 로직이 `Custom Hook`으로 전달되고, 혹은 사용자가 접근할 수 있다.
- Hook은 여러 내부 로직(States, Handler)을 포함하여 컴포넌트의 제어가 쉬워지고 **사용자에게 더 많은 통제권을 준다.**

### &nbsp; - 장단점

- 장점
  - UI 재사용을 넘어 **로직까지 재사용**이 가능해진다.
- 단점
  - 로직과 렌더링 하는 부분이 분리되어 있어 복잡하다.

<br/>
<hr/>

## **3. Atomic**

![image](https://user-images.githubusercontent.com/77691829/232971791-ed5af29b-0371-41f8-a355-83505db46ee6.png)

- 웹 페이지의 구성요소를 **원자단위까지 쪼개어** 설계하는 구조를 말한다. 컴포넌트를 가장 작은 단위에서 하나씩 결합하여 만드는 패턴이다.
- 폴더 구조는 아토믹 디자인의 단위로 구성한다.

```
// 폴더 구조 예시
src
 └ components
   	   ├ pages
       ├ templates
       └ UI
          ├ atom
          ├ molecules
          └ organism
```

### &nbsp; - 단위 구분

- **Atom - Molecule - Organism - Template - Page**의 5가지의 단위로 나눠볼수 있다.

  - `Atom` : label, input, botton과 같은 basic HTML element들로 가장 작은 단위의 컴포넌트이다. 하나의 구성요소로 본인 자체의 스타일만 가지고 있으며 다른 곳에 영향을 미치지 않아야 한다.
  - `Molecule` : Atom을 여러개 조합한 컴포넌트이다. 실제로 무언가 동작이 가능해진다.
  - `Organism` : Molecule과 Atom을 여러개 조합하여 만든 컴포넌트이다.
  - `Template` : 컴포넌트들을 넣을 레이아웃 컴포넌트이다. 페이지의 기본 내용 구조와 스타일링에 집중한다.
  - `Page` : 레이아웃인 template에 컴포넌트들을 다 주입한 컴포넌트이다. Page 단위에서 상태 관리가 이루어져야 한다.
    <br/>

### &nbsp; - 장단점

- 장점
  - 재사용 가능한 설계 시스템을 제공하고 재사용의 효율을 높여 빠른 개발을 가능하게 한다.
  - 디자인을 쉽게 수정할수 있다.
  - 레이아웃을 이해하기 쉬워진다.
- 단점
  - 디자인 시스템을 구축하기 위한 초기 비용이 많이 든다.
  - depth가 깊어져 불필요한 props drilling이 발생하기 쉽다.

<br/>
<br/>

# 📍 어떤 방식을 언제 택해야 좋은 것일까?

📝 프로젝트를 설계 할 때 특정 디자인 패턴을 고집하기보다, 각 디자인 패턴이 가진 장단점을 고려해보며 상황에 맞는 디자인 방식을 택하는 것이 중요하다 생각한다.

<br/>

### **1. Presentation Component - Container Component**

- hook이 등장하기 전 재사용을 위해 사용된 패턴으로, Redux의 창시자 **Dan Abramov**가 공유한 구조이긴하나, 19년 [포스팅](<(https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)>) 상단에 추가된 내용을 보면 _현재는 이런 패턴을 이용하지 않을 것을 제안한다._ 그 이유는 **Custom Hook 패턴**으로 모든 작업이 대체 가능하고, hook을 사용하면 UI 뿐만 아니라 로직까지 재활용이 가능해진다는 추가적인 장점이 있기 때문이다.
- 따라서 presentation component - container component 패턴은 규모가 큰 프로젝트보다, custom hook 보다 간단한 방법으로 관심사의 분리를 하고자 하는 프로젝트에서 사용하는것이 좋아보인다.

### **2. Custom Hook**

- custom hook 방식은 로직 UI 뿐만 아니라 로직까지 재사용이 가능하다는 점이 최대 장점이라 생각한다. 하지만 다른 로직과 렌더링이 분리되어 있는만큼 custom hook 패턴을 사용하기 위해서는 컴포넌트의 동장 방식에 대한 깊은 이해가 선행되어야 한다 생각한다.

### **3. Atomic**

- atomic 디자인은 컴포넌트를 재활용하기 편리한 구조라 생각한다. 하지만 잘게 쪼개져 있는 컴포넌트는 오히려 유지보수에 불편함을 초래할 수 있으므로, 유지보수가 자주 일어나는 프로젝트보다 디자인 설계까 잘 잡혀 있는 프로젝트에서 사용하면 좋을것 같다.

<br/>

📝 덧붙여, 상황에 맞는 디자인 패턴이 무엇인지 용이하게 비교하기 위해 다음의 두 가지 기준으로 각 패턴들을 분석해볼수 있을 것이다.

### &nbsp; 기준 1 . **Inversion of Control(IoC)**

- 컴포넌트를 사용하는 유저에게 주어지는 유연성(flexibility)와 제어(control)의 정도

### &nbsp; 기준 2 . **Implementation complexity**

- 유저와 개발자 모두에 대해 그 패턴을 사용하는 난이도

&nbsp; &nbsp; 👉🏻 예를 들어, presentation & container 패턴보다 custom hook 패턴은 inversion of control과 implementation complexity의 정도가 높은 편이다. IoC가 높으면 유지보수 측면에서는 좋으나, plug and play라는 접근 방식에서 멀어진다는 단점이 있으므로 상황에 맞게 적절한 패턴을 적용시키는 것이 중요하다.

<br/>
<br/>

# 📍 프론트엔드에게 디자인 패턴이란 어떤 존재일까?

### 📝 `소프트웨어 아키텍처`와 `디자인 패턴`의 개념 차이

소프트웨어 아키텍처라는 개념과 디자인 패턴이라는 개념이 모호하게 다가와 각각의 정의에 대해 함께 알아보았다.

- **소프트웨어 아키텍처** : 유연성, 확장성, 실현가능성, 재사용성, 보안성과 같은 소프트웨어의 특성들을 기술적, 사업적 기대사항에 맞는 구조화된 솔루션으로 만들어가는 과정으로 아키텍처 특성, 아키텍처 결정, 설계 원칙이 결합된 시스템의 구조
- **디자인 패턴** : 각 모듈이 어떤 역할을 수행하는지, 클래스의 범위와 함수의 목적을 정하는 등 코드 레벨의 디자인. 소프트웨어의 특정 구현을 직접 제공하지는 않지만 반복되는 문제 상황들을 최적화된 방법으로 해결하도록 돕는 역할을 말한다.

즉, 디자인 패턴은 소프트웨어 아키텍처보다 작은 범위로, **어떻게 코드를 작성할것인가에 대한 방법론**이라 정리할 수 있다.

<br/>

### 📝 디자인 패턴이 필요한 이유

프론트엔드 개발자에게 디자인 패턴이 필요한 이유는 크게 두가지 측면으로 나누어 볼수 있다 생각한다.

#### 1. **효율적인 개발을 위해**

- 디자인 패턴은 유지보수, 재사용의 용이성과 깊은 관련이 있다. 생각한다. 디자인 패턴을 잘 파악하고 있다면 어떤 코드가 수정이 필요한지 쉽게 파악할 수 있으며 로직이나 컴포넌트 등을 재사용하여 성능 개선에도 영향을 줄 수 있다. 따라서 진행중인 프로젝트를 가장 효율적으로 개발할 수 있는 디자인 패턴이 무엇인지 고민하는 과정은 효율적인 개발을 위해 필요하다 생각한다.

#### 2. **협업하는 개발을 위해**

- 이 [포스팅](https://youngmin.hashnode.dev/react)의 사례와 같이, 협업을 효율적으로 하기 위해서는 통일된 디자인 패턴이 필수적이라 생각한다. 각자가 모두 다른 구조로 개발을 한다면 유지보수가 어려울 뿐만 아니라 협업 과정에서도 어려움이 있을 것이다.
  정답으로 정해진 디자인 패턴은 없으므로 프로젝트 초기 단계에서 팀의 상황에 맞는 디자인 패턴 컨벤션을 도입하는것이 좋다는 점을 알게되었다.
  다양한 디자인 패턴을 활용해보며 앞으로 참여하게 될 프로젝트에서 어떤 디자인 패턴을 적용하는게 좋을지 고민하는 과정을 경험해보고 싶다!

<br/>

### 참고자료

- https://doiler.tistory.com/38
- https://www.nextree.io/react-design-pattern/
- https://cocobi.tistory.com/167
