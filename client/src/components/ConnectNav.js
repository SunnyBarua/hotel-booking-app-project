import { SettingOutlined } from '@ant-design/icons';
import { Badge, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { currencyFormatter, getAccountBalance, payoutSetting } from '../actions/stripe';
const {Meta}=Card
const {Ribbon}=Badge

const ConnectNav = () => {
    const [loading,setLoading]=useState(false)
    const [balance,setBalance]=useState(0)
    const {auth}=useSelector((state)=>({...state}))
    const {user,token}=auth
    const handlePayoutSettings=async()=>{
        setLoading(true)
        try{
            const res=await payoutSetting(token)
            // console.log("RES FOR PAYOUT SETTING LINK",res)
            window.location.href=res.data.url
            setLoading(false)
        } 
        catch(err)
        {
            console.log(err)
            setLoading(false)
            toast.error("Unable to access settings. Try again")
        }

    }
   
    useEffect(()=>{
        getAccountBalance(auth.token).then(res=>{
            console.log(res)
            setBalance(res.data)
        })
    },[])
    return (
        <div className="d-flex justify-content-around">
            <Card>
            <Meta
                avatar={<Avatar>{user.name[0]}</Avatar>}
                title={user.name}
                description={`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>
            {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled &&
            (<>
            <Ribbon text="Available" color="grey">
                <Card className="bg-light pt-1">
                    {balance && balance.pending && balance.pending.map((ba,i)=>(
                        <span key={i} className="lead">
                            {currencyFormatter(ba)}
                        </span>
                    ))}
                </Card>
            </Ribbon>
            <Ribbon text="Payout" color="silver">
                <Card onClick={handlePayoutSettings} className="bg-light pointer">
                    <SettingOutlined className="h5 pt-2"/>
                </Card>
            </Ribbon>
            </>)}
        </div>
    )
}

export default ConnectNav
