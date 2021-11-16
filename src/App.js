import { Component } from 'react';
import './App.css';

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

		// нажата =
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
			<div className="calc">
				<div className="calc-screen">
					<p>{out}</p>
				</div>
				<div className="buttons" onClick={this.buttonClick}>
					<div className="btn ac bg-grey">ac</div>
					<div className="btn plus-minus bg-grey">+/-</div>
					<div className="btn percent bg-grey">%</div>
					<div className="btn division bg-orange">/</div>

					<div className="btn seven">7</div>
					<div className="btn eigth">8</div>
					<div className="btn nine">9</div>
					<div className="btn myltiply bg-orange">X</div>

					<div className="btn four ">4</div>
					<div className="btn five ">5</div>
					<div className="btn six ">6</div>
					<div className="btn minus bg-orange">-</div>

					<div className="btn one ">1</div>
					<div className="btn two ">2</div>
					<div className="btn three ">3</div>
					<div className="btn plus bg-orange">+</div>

					<div className="btn zero ">0</div>
					<div className="btn dot ">.</div>
					<div className="btn equal bg-orange">=</div>


				</div>
			</div>
		);
	}
}

export default App;
