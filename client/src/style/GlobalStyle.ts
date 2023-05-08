import { createGlobalStyle } from 'styled-components';

// rest 라이브러리 import해도 됨!

// reset.css
const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	border: 0;
	box-sizing: border-box;
	font: inherit;
	vertical-align: baseline;
	text-decoration:none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
	font-family: 'Noto Sans KR', sans-serif;
}
body {
	background-color: ${(props) => props.theme.themeStyle.backgroundColor};
	color:${(props) => props.theme.themeStyle.fontColor};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
button,input,textarea{
	font-family: 'Noto Sans KR', sans-serif;
}
button{ 
	cursor: pointer;
	background-color:transparent;
	border:0;
}
u {
    text-decoration: underline;
}
strong {
    font-weight: bold;
}
em {
    font-style: italic;
}
`;

export default GlobalStyle;
