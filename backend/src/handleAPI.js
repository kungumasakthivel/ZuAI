const express = require('express');
const db = require('./database');

const route = express.Router();

// get all posts from db
route.get('/posts', (req, res) => {
    db.all(`SELECT * FROM posts`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: 'error is fetching posts',
                status: 0
            });
        }
        res.send(rows);
    });
})

// get post based on id 
route.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => {
        if(err) {
            return res.status(400).json({
                message: 'error is fetching post by id',
                status: 0
            })
        }
        if(!row) {
            return res.status(400).json({
                message: 'error no such post found from id: ' + id,
                status: 0
            })
        }
        res.send(row);
    });
});

// post method to post the post
route.post('/posts', (req, res) => {
    const {title, body} = req.body;
    // console.log(title.length, body);
    if(title === undefined || body === undefined) {
        return res.status(400).json({
            message: 'title or body is not defined',
            status: 0
        })
    }
    if(title.length === 0 || body.length === 0) {
        return res.status(400).json({
            message: "title or body is empty",
            status: 0
        })
    }
    
    db.run(
        `INSERT INTO posts (title, body) VALUES (?, ?)`,
        [title, body],
        function(err) {
            if(err) {
                return res.status(400).json({
                    message: 'error in inserting post',
                    status: 0
                });
            }
            res.status(201).json({
                id: this.lastID,
                message: 'post created successfully',
                status: 1
            });
        }
    );
    
});

// put method to update the created post
route.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const {title, body} = req.body;

    db.run(
        `UPDATE posts SET title = ?, body = ? WHERE id = ?`,
        [title, body, id],
        function(err) {
            if(err) {
                return res.status(400).json({
                    message: 'error in updating post',
                    status: 0
                });
            }
            if(this.changes === 0) {
                return res.status(404).json({
                    message: 'Assignment not found!'
                })
            }
            res.status(200).json({
                message: 'post updated successfully',
                status: 1
            })
        }
    )
});

route.delete('/posts/:id', (req, res) => {
    const id = req.params.id;

    db.run(
        `DELETE FROM posts WHERE id = ?`,
        [id],
        function(err) {
            if (err) {
            return res.status(400).json({ 
                message: 'Error deleting assignment',
                status: 0
            });
            }
            if (this.changes === 0) {
                return res.status(404).json({ 
                    message: 'Assignment not found',
                    status: 0 
                });
            }
            res.status(200).json({
                message: 'Deleted the post successfully, id: ' + id,
                status: 1 
            })
        }
    )
})

module.exports = route;
