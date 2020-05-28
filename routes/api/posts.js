const express = require('express');
const router = express.Router();

const passport = require('passport');


const Post = require('../../models/Post');
const ValidatePostInput = require('../../validations/posts/post')
const isEmpty = require('../../utils/isEmpty')


// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.send('The posts page is working'));

// @route   GET api/posts
// @desc    Tests posts route
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => {
            if (!posts || isEmpty(posts)) {
                res.status(404).json({ nopostsfound: 'No posts found' });
            }
            else { res.json(posts); }

        })
        .catch(err => res.status(400).json({ location: 'Get Posts', err }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
});

// @route   POST api/posts
// @desc    Create a post for the Current User
// @access  Private
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        const { errors, isValid } = ValidatePostInput(req.body);

        if (!isValid) return res.status(400).json(errors);


        let postFeilds = (({ text, name, avatar }) => ({ text, name, avatar }))(req.body);
        postFeilds.user = req.user.id;


        let newPost = new Post(postFeilds);


        newPost.save().then(post => res.json(post)).catch(err => res.status(400).json({ location: 'Create Post', err }));

    });

// @route   DELETE api/posts/:postId
// @desc    Delete a post for the Current User
// @access  Private
router.delete('/:postId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        let errors = {};

        Post.findOneAndDelete({ user: req.user.id, _id: req.params.postId })
            .then(post => {
                if (!post || isEmpty(post)) {
                    res.status(404).json({ nopostfound: 'No posts found' });
                }
                else {
                    res.json({ success: true });
                }
            }).catch(err => res.status(400).json({ location: 'Delete Post', err }));
    });




// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: 'User already liked this post' });
                    }

                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({ notliked: 'You have not yet liked this post' });
                    }

                    // Get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // Splice out of array
                    post.likes.splice(removeIndex, 1);

                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = ValidatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };

                // Add to comments array
                post.comments.unshift(newComment);

                // Save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: 'Comment does not exist' });
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);


module.exports = router;