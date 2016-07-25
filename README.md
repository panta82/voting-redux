# Voting Redux

#### Following: http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

### Notes:

- I'll replace hardcoded `action` strings with the hash-as-enum pattern.
```
export default {
	SET_ENTRIES: 'SET_ENTRIES',
	NEXT: 'NEXT',
	VOTE: 'VOTE'
};
```
- Strings everywhere. Is there a way to use more literals or classes, so that IDE can help out?
- No debugger for node js. Server side babel = terrible idea
- In `reducer_spec`, I tried to reduce repetition. Could I reduce it more? (hehe, reduce) 
- Simplifying reducer spec by bringing in core.js was maybe not such a good idea
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
- `devtool: 'source-map'` in webpack config, to enable browser debugging
- > Notice that we added a ref for the Winner component. It's something we'll use in unit tests to grab the corresponding DOM node.

    This smells. Adding crap to your code to hook in tests later. But, sometimes, there is no other way...
- `react-addons-test-utils` API is amazingly ugly. Why not jQuery? This kind of API should be a solved problem by now.
- JetBrains IDE-s can't deal with code like `expect(winner).to.be.ok;`.
    Crappy solution: add `//noinspection BadExpressionStatementJS` before the statement.
    Good solution: ???
- You need to have `import React from 'react';`, even if you're not actually using the `React` object. I guess JSX presumes there is global "React" thing? Or something?
- I blew my single inheritance allowance on `PureComponent` that encapsulates the clunky `shouldComponentUpdate` setup.
- Pure components seem to be the *real* reason to use immutable in react. Doesn't leave much of a reason on the server, though.
- Despite best effort, no way to make babel compiled code debugable in JetBrains tools. Not even frontend code. This sucks.
- I reduced repetition in tests by adding some internal helper functions. This is a slippery slope, leading to tests being super complicated and inscrutable. But I just don't like to type that much :/
- Hot reloads of `index.jsx` don't work. According to [this](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md):
    
    > If you get this warning when editing a root component, this may be because you don't export anything from it, and call React.render from there. Put your root component in a separate file (e.g. App.jsx) and require it from index.js where you call React.render.
    
    TODO: Move most of the stuff outside of `index.jsx`
- I don't like all this port hardcoding all over the place.
- In `mapStateToProps`, is there a better way to yank out these nested properties? This is JAVA-like verbose, with none of the JAVA-like type safety.
- Why doesn't IDEA add `"use strict"` to the top of a new file? Instead, it waits for me to create a new function and then adds it inside the function. Silly.
-  Oh, come on.
    ```javascript
    export default socket => store => next => action => {};
    ```
    
    Functional equivalent of [AbstractSingletonProxyFactoryBean](https://docs.spring.io/spring/docs/2.5.x/javadoc-api/org/springframework/aop/framework/AbstractSingletonProxyFactoryBean.html)
- Added `doesn't remove hasVoted if pair remains the same` unit test, after a bug fix.
- Would it make sense to separate `Foo` component and `FooContainer` into their own files? 
- Security method in excecise 3 isn't all that impressive, but I guess it would stop a casual cheater.
- Stupid immutable objects make everything harder.
- Restart was more difficult to add than anticipated.
- Babel compiler doesn't know how to translate `import * from '../src/core';` into `import * from '../dist/core';`. Reiterating, using this crap in node is stupid.
 
### Deployment instructions