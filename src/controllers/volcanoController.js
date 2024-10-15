const router = require('express').Router();

const volcanoServices = require('../services/volcanoServices');

router.get('/create', (req, res) => {
    if (!res.user) {
        res.redirect('/');
    }

    res.render('volcano/create');
})

router.post('/create', async (req, res) => {
    const user = res.user;
    const volcanoData = req.body;

    volcanoData.owner = user._id;
    try {
        await volcanoServices.createVolcano(volcanoData);
        res.redirect('/catalog');
    } catch (err) {
        const errorMessage = err.errors ? Object.values(err.errors)[0]?.message : err.message;

        res.render('volcano/create', { error: errorMessage });
    }
});

router.get('/catalog', async (req, res) => {

    try {
        const volcanos = await volcanoServices.getAllVolcanos().lean();
        res.render('volcano/catalog', { volcanos });

    } catch (err) {
        console.log(err);
    }

})

router.get('/volcano/details/:volcanoId', async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = res.user?._id;

    try {
        const volcano = await volcanoServices.getOneVolcanoById(volcanoId).lean();
        const isOwner = userId == volcano.owner;
        const votes = volcano.voteList.length || 0;
        const isVoted = volcano.voteList.find(usersId => usersId == userId);


        res.render('volcano/details', { volcano, isOwner, votes, isVoted });

    } catch (err) {
        console.log(err);

    }
})

router.get('/volcano/vote/:volcanoId', async (req, res) => {

    if (!res.user) {
        return res.redirect('/404');
    }

    const volcanoId = req.params.volcanoId;

    try {
        const volcano = await volcanoServices.getOneVolcanoById(volcanoId);
        volcano.voteList.push(res.user._id);
        await volcanoServices.getVolcanoByIdAndUpdate(volcanoId, volcano);
        res.redirect('/volcano/details/' + volcanoId)

    } catch (err) {
        console.log(err);

    }
});

router.get('/volcano/edit/:volcanoId', async (req, res) => {
    if (!res.user) {
        res.redirect('/404');
    }

    const volcanoId = req.params.volcanoId;

    try {
        const volcano = await volcanoServices.getOneVolcanoById(volcanoId).lean();
        volcano.types = ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'];
        volcano.types = volcano.types.map(type => ({
            name: type,
            selected: type == volcano.typeVolcano,
        }))
        res.render('volcano/edit', { volcano })
    } catch (err) {
        console.log(err);
    }
})

router.post('/volcano/edit/:volcanoId', async (req, res) => {
    const updatedData = req.body;
    const volcanoId = req.params.volcanoId;

    try {
        await volcanoServices.getVolcanoByIdAndUpdate(volcanoId, updatedData);
        res.redirect('/volcano/details/' + volcanoId);
    } catch (err) {
        const errorMessage = err.errors ? Object.values(err.errors)[0]?.message : err.message;

        res.render('volcano/edit', { error: errorMessage });
    }
})

router.get('/volcano/delete/:volcanoId', async (req, res) => {
    if (!res.user) {
        res.redirect('/404');
    }

    const volcanoId = req.params.volcanoId;

    try {
        await volcanoServices.deleteVolcanoById(volcanoId);
        res.redirect('/catalog');
    } catch (err) {
        console.log(err);
    }
})

router.get('/search', async (req, res) => {

    const query = req.query;
    query.types = ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'];
    query.types = query.types.map(type => ({
        name: type,
        selected: type == query.typeVolcano,
    }))
    try {
        let volcanos = await volcanoServices.getAllVolcanos().lean();

        if (query.name) {
            volcanos = volcanos.filter(volcano => volcano.name.toLowerCase().includes(query.name.toLowerCase()));
        }

        if (query.typeVolcano) {
            volcanos = volcanos.filter(volcano => volcano.typeVolcano == query.typeVolcano);
        }

        res.render('volcano/search', { volcanos, query });
    } catch (err) {
        console.log(err);

    }

})


module.exports = router;