var express = require('express');
var router = express.Router();
var db = require('../dbConnection');
const jwt = require("jsonwebtoken");


router.post("/login", function (req, res) {
    email = req.body.email;
    password = req.body.password;

    if (!email || !password) {
        res.json({ success: false, token: "Blank" });
    } else {
        try {
            db.query(`SELECT * FROM login_master where email=? AND password=?`, [email, password], (err, results) => {
                if (results.length > 0) {
                    const jwttoken = jwt.sign(
                        {
                            Role_Id: results[0].Role_Id
                        },
                        "encryption_key",
                        {
                            expiresIn: '8h'
                        }
                    );
                    
                    return res.json({
                        token: jwttoken,
                        success: true,
                    });
                    

                } else {
                    return res.json({
                        success: false,
                        token: "Incorrect UserId or Password",
                    });
                }
            })
        } catch (e) {
            return res.json({
                success: false,
                token: "Something Went Wrong",
            });
        }
    }
})



module.exports = router;