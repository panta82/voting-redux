# Voting Redux

##### Following: http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

####Notes:

- Using `action`s const instead of strings everywhere
- Strings everywhere. Is there a way to use more literals or classes, so that IDE can help out?
- No debugger for node js. Server side babel = terrible idea
- `reducer_spec`, reduced repetition. Could I reduce it more? (hehe, reduce) 
- Simplifying reducer spec by bringing in core = maybe not such a good idea
- [Reducer composition](http://rackt.github.io/redux/docs/basics/Reducers.html) FTW
- Is this whole "store is the only mutable variable" just a clever way to sneak in some functional memory layout that never got out of the academia?