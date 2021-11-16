import { Component } from 'react';
import styled from 'styled-components';
//import './App.css';


const Calc = styled.div`
	width: 300px;
	height: 500px;
	border: 1px solid #000;
	margin: 50px auto;
	background: #000;
	border-radius: 20px;
	color: #fdfdfd;
	font-family: Arial;
	display: grid;
	padding: 18px;
	box-shadow: 4px 4px 6px #4f4f4f;
`;
const Screen = styled.div`
	height: 125px;
	position: relative;
	padding: 10px;
	display: grid;
	justify-items: end;
	align-items: end;
	p {
		text-align: right;
		font-size: 4rem;
		margin: 0;
		user-select: none;
	}
`;
const Buttons = styled.div`
	display: grid;
	grid-template-areas:
		"ac plus-minus percent division"
		"seven eigth nine multi"
		"four five siz minus"
		"one two three plus"
		"zero zero dot equal";
	grid-gap: 7px;
	justify-items: center;
	align-items: center;
	button {
		padding: 0;
		border: none;
		font: inherit;
		color: inherit;
		background-color: transparent;
		cursor: pointer;
	}
	.btn {
		width: 60px;
		height: 60px;
		background: #333;
		border-radius: 100%;
		text-align: center;
		line-height: 63px;
		font-size: 1.5rem;
		cursor: pointer;
		outline: none;
		user-select: none;
		&.bg-grey {
			background-color: #a6a6a6;
		}

		&.plus-minus {
			grid-area: plus-minus;
		}

		&.percent {
			grid-area: percent;
		}

		&.division {
			grid-area: division;
		}

		&.zero {
			grid-area: zero;
			width: 100%;
			border-radius: 34px;
		}

		&.bg-dark-grey {
			background-color: #333;
		}

		&.bg-orange {
			background-color: #ff9501;
		}
		&:hover {
			filter: brightness(130%);
		}
		&:active {
			filter: brightness(90%);
		}
	}
`;
class App extends Component {

	state = {
		a: '',
		b: '',
		sign: '',
		finish: false,
		out: 0,
		digit: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
		action: ['-', '+', 'X', '/']
	}

	clearAll = () => {
		this.setState({
			a: '',
			b: '',
			sign: '',
			finish: false,
			out: 0,
		})
	}
	buttonClick = (event) => {
		if (!event.target.classList.contains('btn')) return;
		// нажата кнопка clearAll ac
		if (event.target.classList.contains('ac')) {
			this.clearAll();
			return;
		}

		this.setState({ out: '' });

		const key = event.target.textContent;

		const { a, b, sign, finish, digit, action } = this.state;
		// если нажата клавиша 0-9 или .
		if (digit.includes(key)) {
			if (b === '' && sign === '') {
				this.setState(({ a }) => ({
					a: a + key,
					out: a + key
				}))
			}
			else if (a !== '' && b !== '' && finish) {
				this.setState({
					b: key,
					finish: false,
					out: key
				})
			}
			else {
				this.setState(({ b }) => ({
					b: b + key,
					out: b + key
				}))
			}
			return;
		}

		// если нажата клавиша + - / *
		if (action.includes(key)) {
			this.setState({
				sign: key,
				out: key
			})
			return;
		}
		if (key === '+/-') {
			switch (true) {
				case (a === '' && b === ''):
					this.setState({ out: 0 });
					return;
				case (a !== '' && b === '' && a > 0):
					this.setState(({ a }) => ({
						a: `-${a}`,
						out: `-${a}`
					}));
					return;
				case (a !== '' && b === '' && a < 0):
					this.setState(({ a }) => ({
						a: a.slice(1),
						out: a.slice(1)
					}));
					return;
				case (a !== '' && b !== '' && b > 0):
					this.setState(({ b }) => ({
						b: `-${b}`,
						out: `-${b}`
					}));
					return;
				case (a !== '' && b !== '' && b < 0):
					this.setState(({ b }) => ({
						b: b.slice(1),
						out: b.slice(1)
					}));
					return;
				default: return;
			}
		}
		if (key === '%') {
			switch (true) {
				case ((a === '' && b === '') || (a !== '' && b === '')):
					this.setState({ out: 0 });
					return;
				case (a !== '' && b !== '' && sign === '-'):
					this.setState(({ a, b }) => ({
						a: `${a - (a / 100 * b)}`,
					}));
					break;
				case (a !== '' && b !== '' && sign === '+'):
					this.setState(({ a, b }) => ({
						a: `${+a + +(a / 100 * b)}`,
					}));
					break;
				case (a !== '' && b !== '' && sign === 'X'):
					this.setState(({ a, b }) => ({
						a: `${a * (a / 100 * b)}`,
					}));
					break;
				case (a !== '' && b !== '' && sign === '/'):
					this.setState(({ a, b }) => ({
						a: `${a / (a / 100 * b)}`,
					}));
					break;
				default: break;
			}
			this.setState(({ a }) => ({
				finish: true,
				out: a
			}))
			return;
		}
		if (key === '=') {
			if (b === '') {
				this.setState(({ a }) => ({ b: a }))
			}
			switch (sign) {
				case "+":
					this.setState(({ a, b }) => ({ a: +a + +b }))
					break;
				case "-":
					this.setState(({ a, b }) => ({ a: a - b }))
					break;
				case "X":
					this.setState(({ a, b }) => ({ a: a * b }))
					break;
				case "/":
					if (b === '0') {
						this.clearAll();
						return;
					}
					this.setState(({ a, b }) => ({ a: a / b }))
					break;
				default: break;
			}
			this.setState(({ a }) => ({
				finish: true,
				out: a
			}))
		}

	}
	render() {
		const { out } = this.state;
		return (
			<Calc>
				<Screen>
					<p>{out}</p>
				</Screen>
				<Buttons onClick={this.buttonClick}>
					<button className="btn ac bg-grey">ac</button>
					<button className="btn plus-minus bg-grey">+/-</button>
					<button className="btn percent bg-grey">%</button>
					<button className="btn buttonision bg-orange">/</button>

					<button className="btn seven">7</button>
					<button className="btn eigth">8</button>
					<button className="btn nine">9</button>
					<button className="btn myltiply bg-orange">X</button>

					<button className="btn four ">4</button>
					<button className="btn five ">5</button>
					<button className="btn six ">6</button>
					<button className="btn minus bg-orange">-</button>

					<button className="btn one ">1</button>
					<button className="btn two ">2</button>
					<button className="btn three ">3</button>
					<button className="btn plus bg-orange">+</button>

					<button className="btn zero ">0</button>
					<button className="btn dot ">.</button>
					<button className="btn equal bg-orange">=</button>
				</Buttons>
			</Calc>
		);
	}
}

export default App;
