import express from "express"
import { createConnectAccount, getAccountBalance, getAccountStatus, payoutSetting, stripeSessionId, stripeSuccessRequest } from "../controllers/stripeController.js"

const router=express.Router()

router.post("/create-connect-account",createConnectAccount)
router.post("/get-account-status",getAccountStatus)
router.post("/get-account-balance",getAccountBalance)
router.post("/payout-setting",payoutSetting)
router.post('/stripe-session-id',stripeSessionId)
router.post("/stripe-success",stripeSuccessRequest)

export default router