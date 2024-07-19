import React from "react";
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { Trash } from "react-bootstrap-icons";

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3 text-white">The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log("User Email:", userEmail);
        console.log("Order Data:", data);

        let response = await fetch("http://localhost:4500/api/orderData", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });

        if (response.ok) {
            console.log("Order placed successfully.");
            dispatch({ type: "DROP" });
            //alert("Your cart is empty now!");
        } else {
            const responseData = await response.json();
            console.log("Order failed:", responseData.message);
            alert("Failed to place the order. Please try again.");
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className="btn bg-success text-white mt-5" onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
}