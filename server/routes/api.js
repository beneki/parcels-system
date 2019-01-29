/* eslint-disable linebreak-style */
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const auths = require('./../constants/AUTH');
const shipments = require('./../constants/SHIPMENTS');
const managers = require('./../constants/MANAGERS');
const bikers = require('./../constants/BIKERS');
const router = express.Router();
const secretPrivateKey = 'cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ';

class API {
    constructor() { } // TO-DO

    verifyToken(req, res, next) {
        if(!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if(token === 'null') {
            return res.status(401).send('Unauthorized request');
        }
        let payload = jwt.verify(token, secretPrivateKey);
        if(!payload) {
            return res.status(401).send('Unauthorized request');
        }
        req.userId = payload.subject;
        next();
    }

    makeEnums(jEnum) {
        return Object.freeze(jEnum);
    }

    intitRoutes() {
        router.get('/', (req, res) => {
            res.send('Testing API');
        });
        // router.get('/shipments', this.verifyToken, (req, res) => {
        //     //const orderStatus = this.makeEnums({ 'WAITING': 0, ASSIGEND: 1, 'PICKE_UP': 2, 'DELIVERED': 3 });
        //     // let userData = req.body;
        //     // let user = new User(userData);
            
        //     const shipms = shipments.map((shipment) => {
        //         if(shipment.BikerId !== null) {
        //             const theBiker = bikers.find((biker) => biker.id === shipment.BikerId);

        //             return {
        //                 ...shipment,
        //                 assignee: theBiker.FirstName + ' ' + theBiker.LastName
        //             };
        //         } else {
        //             return {
        //                 ...shipment,
        //                 assignee: 'No biker assigned'
        //             };

        //         }
        //     });

        //     res.status(200).send(shipms);
        // });
        router.get('/shipments/limit/:limit/offset/:offset/', this.verifyToken, (req, res) => {
            const { limit, offset } = req.params;
            const shipms = shipments.slice((offset-1)*limit, offset* limit);
            const pagedData = {
                meta: {
                    totalCount:  shipments.length,
                    limit: limit
                },
                items: shipms
            };
            res.status(200).send(pagedData);
        });
        router.get('/shipmentsForBiker/limit/:limit/offset/:offset/', this.verifyToken, (req, res) => {
            const { limit, offset } = req.params;
            const token = req.headers.authorization.split(' ')[1],
                userId = Number(jwt.decode(token.subject)),
                shipmsByBiker = shipments.filter((shipment) => (shipment.BikerId === userId)) ,
                shipms = shipmsByBiker.slice((offset-1)*limit, offset* limit);

            const pagedData = {
                meta: {
                    totalCount:  shipments.length,
                    limit: limit
                },
                items: shipms
            };
            res.status(200).send(pagedData);
        });

        router.get('/bikers', this.verifyToken, (req, res) => {
            // const bikerPlus = bikers.map((biker) => {
            //     const toShips = [];
            //     shipments.forEach((shipm) => {
            //         if(shipm.BikerId === biker.id ) {
            //             toShips.push(shipm.id);
            //         }
            //     });
            //     return { ...biker };
            // });
            console.log(bikers);
            res.status(200).send(bikers);
        });

        router.put('/shipments', this.verifyToken, (req, res) => {
            const changedItems = req.body;
            let modifiedShipments = shipments;
            changedItems.forEach((itm) => {
                modifiedShipments[itm.id] = itm;
            });                          
            fs.writeFile('./constants/SHIPMENTS.json', JSON.stringify(modifiedShipments, null, 2), function (err) {
                if (err)  {
                    res.status(202).send({status: 'error', message: 'update operation has not been commited yet'});
                } else {
                    res.status(200).send({status: 'success', message: 'successfully updated'});
                }
            });
        });

        
        router.post('/login', (req, res) => {
            let userData = req.body;
            const authedUser = auths.find((person) => person.UserName === userData.username);

            if (authedUser) {
                if (authedUser.password !== userData.password) {
                    res.status(401).send({status: 'Error '+authedUser.password, message: 'Invalid password'+userData.password});
                } else {
                    let userDetails = null;
                    if (authedUser.IsAdmin) {
                        userDetails = managers.find((manager) => manager.id === authedUser.FKey);
                    } else {
                        userDetails = bikers.find((biker) => biker.id === authedUser.FKey);
                    }
                    const claim = {
                            subject : authedUser.id,
                            role: authedUser.IsAdmin? 'admin': 'biker'
                        }, authedUserInfo = {
                            firstName: userDetails.FirstName,
                            lastName: userDetails.LastName,
                            email: userDetails.Email,
                            token: jwt.sign(claim, secretPrivateKey)
                        };
                    res.status(200).send(authedUserInfo);
                }  
            } else {
                res.status(401).send({status: 'Error', message: 'Invalid username'});
            }
        
        });

        return router;
    }

}

module.exports =  new API().intitRoutes();
