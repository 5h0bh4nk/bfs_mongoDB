var express = require('express');
var router = express.Router();

var Node = require('../models/node');

router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling GET requests to /tree'
    });
});

router.get('/create', function(req, res, next) {
    // create a tree
    const root = new Node({value: 1});
    const node2 = new Node({value: 2});
    const node3 = new Node({value: 3});
    const node4 = new Node({value: 4});
    const node5 = new Node({value: 5});
    const node6 = new Node({value: 6});
    const node7 = new Node({value: 7});
    const node8 = new Node({value: 8});
    
    root.left = node2;
    root.right = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;
    node4.left = node8;

    node8.save();
    node7.save();
    node6.save();
    node5.save();
    node4.save();
    node3.save();
    node2.save();

    root.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /tree/create',
                createdNode: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/bfs/:value', async function(req, res, next) {
    const root = await Node.findOne({ value: req.params.value });

    if(!root) {
        return res.status(404).json({
            message: 'Node not found'
        });
    }

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        if (node.left) {
            const left = await Node.findById(node.left);
            queue.push(left);
        }
        if (node.right) {
            const right = await Node.findById(node.right);
            queue.push(right);
        }
    }

    res.status(200).json({
        message: 'Handling GET requests to /tree/bfs/value',
        result: result
    });
});

router.get('/find/:value', async function(req, res, next) {
    const root = await Node.findOne({ value: req.params.value });

    if(!root) {
        return res.status(404).json({
            message: 'Node not found'
        });
    }

    res.status(200).json({
        message: 'Handling GET requests to /tree/find/value',
        result: root
    });
});

module.exports = router;