import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const response = await fetch("http://localhost:4500/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Order Data Fetched:", data);
            setOrderData(data.orderData || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.map((data, index) => (
                        <div key={index} className='col-12'>
                            <h4>Order Date: {data[0].Order_date}</h4>
                            {data.slice(1).map((arrayData, idx) => (
                                <div key={idx} className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{arrayData.name}</h5>
                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                            <span className='m-1'>{arrayData.qty}</span>
                                            <span className='m-1'>{arrayData.size}</span>
                                            <span className='m-1'>{data.Order_date}</span>
                                            <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                ₹{arrayData.price}/-
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )) : <div className="m-5 w-100 text-center fs-3 text-white">No Orders Yet!</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
}