import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Restaurant } from '../model/Restaurant';
import { Table } from '../model/Table';
import { Reservation } from '../model/Reservation';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    //auth
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User({email: email, password: password, name: name, address: address, nickname: nickname});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });
    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    //restaurant
    router.get('/getAllRestaurant', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Restaurant.find();
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/createRestaurant', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.body.name;
            const address = req.body.address;
            const type = req.body.type;
            const restaurant = new Restaurant({name: name, address: address, type: type});
            restaurant.save().then(restaurant => {
                res.status(200).send(restaurant);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    //tables
    router.get('/getAllTable', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Table.find();
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getTableById', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.body.id;
            const query = Table.findOne({_id: id});
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getAllTableByRestaurant', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Table.find({restaurantName: req.body.name});
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getAllTableByRestaurantForReservation', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Table.find({restaurantName: req.body.name, booked: false});
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/createTable', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const restaurantName = req.body.restaurantName;
            const indoor = req.body.indoor;
            const seets = req.body.seets;
            const date = req.body.date;
            const booked = false;
            const table = new Table({restaurantName: restaurantName, indoor: indoor, seets: seets, date: date, booked: booked});
            table.save().then(table => {
                res.status(200).send(table);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/deleteTable', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.body.id;
            const query = Table.deleteOne({_id: id});
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    //reservation
    router.post('/createReservation', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Table.findOneAndUpdate({_id: req.body.id}, {booked: true}, { new: true });
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
                const reservation = new Reservation({email: email, tableIdentifier: tableIdentifier, bookDate: bookDate});
                reservation.save().then(reservation => {
                    res.status(200).send(reservation);
                }).catch(error => {
                    res.status(500).send(error);
                })
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/getAllReservationByEmail', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Reservation.find({email: req.body.email});
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/deleteReservation', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Table.findOneAndUpdate({_id: req.body.id}, {booked: false}, { new: true });
            query.then(() => {
                const query = Reservation.deleteOne({_id: req.body.id});
            query.then((data) => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });


    return router;
}