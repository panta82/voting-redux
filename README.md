# Voting Redux

##### Following: http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

#### Notes:

- Using `action`s const instead of strings everywhere
- Strings everywhere. Is there a way to use more literals or classes, so that IDE can help out?
- No debugger for node js. Server side babel = terrible idea
- `reducer_spec`, reduced repetition. Could I reduce it more? (hehe, reduce) 
- Simplifying reducer spec by bringing in core = maybe not such a good idea
- [Reducer composition](http://rackt.github.io/redux/docs/basics/Reducers.html) FTW
- Is this whole "store is the only mutable variable" thing just a clever way to sneak in some functional memory layout that never got out of the academia?
- Why did ES6 have to go with `import x from 'y'`? Python's `from y import x` is so much better for intellisense. Didn't they learn anything from SQL?
- > It allows us to easily run Node code with Babel transpiling support enabled. It adds some performance overhead so it isn't generally recommended for production use, but it works well for the purposes of our tutorial.
    
    Okay... so, is there an option for ES6 modules in production?
- > In most real-world cases, there should be some kind of firewall here, probably not dissimilar to the one in the Vert.x Event Bus Bridge. Apps that have an authentication mechanism should also plug it in here.

    Look into this. Can you even do the authentication over socket.io? HTTPS? Headers? Send token with each message?
- `jsdom` is interesting. Can it be used for other purposes? Scraper?
- Webpack config syntax is a disaster
- Switched from `createClass` to ES6 classes (https://facebook.github.io/react/docs/reusable-components.html#es6-classes)
- Needed to add ` --watch-extensions jsx` to the mocha command line for watch to work on jsx files
- Why is the author consistently adding parenthesis around single argument lambdas? You can just do `x => use(x)`.
- If you already set up a whole testing  workflow and write a complicated unit test, at least perform multiple asserts. Don't do just one.
- Unlike business logic testing, UX testing feels like pointless busywork.