# The Reducer Function

There is something in common between all Redux applications. They have to implement the _reducer: a function that calculates the next state tree based on the previous state tree and the action being dispatched_.


You might have heard that the UI or **the view layer is most predictable when it is described as a pure function** of the application state. This approach was pioneered by React but is now being picked up by other frameworks, such as Ember and Angular.

Redux complements this approach with another idea, that _the state mutations in your app need to be described as a pure function_ that takes the previous state and the action being dispatched and returns the next state of your application.

![thereducer](https://user-images.githubusercontent.com/5876481/34474358-9864a264-ef32-11e7-8a2e-ac4cfd8503d9.png)

Inside any Redux application, there is one particular function, (i.e. Reducer), that takes the state of the whole application and the action being dispatched and returns the next state of the whole application. `It is important that it does not modify the state given to it` (i.e. the previous state). It has to be pure, so it has to return a new object.

Even in large applications, there is still just a single function that manages how the next state is calculated based on the previous state of the whole application and the action being dispatched. It does not have to be slow.

<img width="1458" alt="screen shot 2018-01-01 at 8 35 27 pm" src="https://user-images.githubusercontent.com/5876481/34474419-6088d936-ef33-11e7-92ac-cf2dcad43683.png">

For example, if I change the `visibilityFilter`, **I have to create a new object for the whole state, but I can keep the reference to the previous version of the todos state,** because it has not changed when I changed the `visibilityFilter`. **This is what makes Redux fast**.

        I can keep the reference to the previous version
        
Now you know the third and the last principle of Redux. **To describe state mutations, you have to write a function that takes the previous state of the app, the action being dispatched, and returns the next state of the app**. **This function has to be pure**. This function is called the Reducer.