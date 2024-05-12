"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const User_1 = require("../model/User");
const Restaurant_1 = require("../model/Restaurant");
const Table_1 = require("../model/Table");
const Reservation_1 = require("../model/Reservation");
const configureRoutes = (passport, router) => {
    //auth
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User_1.User({ email: email, password: password, name: name, address: address, nickname: nickname });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/checkAuth', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(500).send(false);
        }
    });
    //restaurant
    router.get('/getAllRestaurant', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Restaurant_1.Restaurant.find();
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/createRestaurant', (req, res) => {
        if (req.isAuthenticated()) {
            const name = req.body.name;
            const address = req.body.address;
            const type = req.body.type;
            const restaurant = new Restaurant_1.Restaurant({ name: name, address: address, type: type });
            restaurant.save().then(restaurant => {
                res.status(200).send(restaurant);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    //tables
    router.get('/getAllTable', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Table_1.Table.find();
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getTableById', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.body.id;
            const query = Table_1.Table.findOne({ _id: id });
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getAllTableByRestaurant', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Table_1.Table.find({ restaurantName: req.body.name });
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getAllTableByRestaurantForReservation', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Table_1.Table.find({ restaurantName: req.body.name, booked: false });
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/createTable', (req, res) => {
        if (req.isAuthenticated()) {
            const restaurantName = req.body.restaurantName;
            const indoor = req.body.indoor;
            const seets = req.body.seets;
            const date = req.body.date;
            const booked = false;
            const table = new Table_1.Table({ restaurantName: restaurantName, indoor: indoor, seets: seets, date: date, booked: booked });
            table.save().then(table => {
                res.status(200).send(table);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/deleteTable', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.body.id;
            const query = Table_1.Table.deleteOne({ _id: id });
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    //reservation
    router.post('/createReservation', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Table_1.Table.findOneAndUpdate({ _id: req.body.id }, { booked: true }, { new: true });
            query.then(() => {
                const dateObj = new Date();
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                const bookDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                const email = req.body.email;
                const tableIdentifier = req.body.id;
                const reservation = new Reservation_1.Reservation({ email: email, tableIdentifier: tableIdentifier, bookDate: bookDate });
                reservation.save().then(reservation => {
                    res.status(200).send(reservation);
                }).catch(error => {
                    res.status(500).send(error);
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getAllReservationByEmail', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Reservation_1.Reservation.find({ email: req.body.email });
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/deleteReservation', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Table_1.Table.findOneAndUpdate({ _id: req.body.id }, { booked: false }, { new: true });
            query.then(() => {
                const query = Reservation_1.Reservation.deleteOne({ _id: req.body.id });
                query.then((data) => {
                    res.status(200).send(data);
                }).catch(error => {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    return router;
};
exports.configureRoutes = configureRoutes;
