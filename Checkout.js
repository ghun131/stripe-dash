import React, { Component } from 'react'
import _ from 'lodash';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastestCharge: 'None',
            cardNumber: ' ',
            expMonth: ' ',
            expYear: ' ',
            money: ' '
        }
        this.createCharge = this.createCharge.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createCharge () {

        this.setState({
            lastestCharge: 'Creating token ...'
        }, () => {
            this.props.postPublic('tokens', {
                'card[number]': this.state.cardNumber,
                'card[exp_month]': this.state.expMonth,
                'card[exp_year]': this.state.expYear
            })
            .then((token) => {
                this.setState({
                    lastestCharge: 'Creating  charge...'
                });
                return this.props.postSecret('charges', {
                    'amount' : this.state.money * 100,
                    'currency': 'usd',
                    'description': 'test charge',
                    'source': token.id
                })
            })
            .then((charge) => {
                this.setState({
                    lastestCharge: charge.id
                })
            })
        });
    } 

    render() {
        return (
            <div>
                <h2>Checkout</h2>
                <label>
                Card number:
                <input
                    name="cardNumber"
                    type="text"
                    maxLength="16"
                    value={this.state.cardNumber}
                    onChange={this.handleInputChange} />
                </label>
                <br /><br />
                    <label>
                    Expired month:
                    <input
                        name="expMonth"
                        type="text"
                        maxLength="2"
                        value={this.state.expMonth}
                        onChange={this.handleInputChange} />
                    </label>
                <br /><br />
                    <label>
                    Expired year:
                    <input
                        name="expYear"
                        type="text"
                        maxLength="4"
                        value={this.state.expYear}
                        onChange={this.handleInputChange} />
                    </label>
                <br /><br />
                <br /><br />
                    <label>
                    <b>Amount:</b>
                    <input
                        name="money"
                        type="number"
                        value={this.state.money}
                        onChange={this.handleInputChange} />
                    </label>
                <br /><br />
                    <button onClick={this.createCharge}>PAY</button>
                    <p>Latest charge: {this.state.lastestCharge}</p>
            </div>
        )
    }
}

export default Checkout