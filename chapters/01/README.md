# Redux: The Single Immutable State Tree

In Redux weather your app is simple or complex your state are going to represent the `whole state` of your application as a `single JavaScript object`. 

        state = single JavaScript object

All `mutations`, and `changes` in the state in Redux are `explicit`. It is possible to keep `track` of all of them.

<img width="1097" alt="screen shot 2017-12-31 at 2 29 41 am" src="https://user-images.githubusercontent.com/5876481/34460950-8cc91608-edd2-11e7-8b34-13036f2f70c5.png">

The first principle of Redux, which is that, everything that changes in your application, including the **data** and the **UI state**, is contained in a single object, we call the `state` or the `state tree`.

These are all plain objects, describing what happens in a app. 

Now you know the second principle of Redux -- the state is read only. The only way to change the state tree is by dispatching an action. An action is a plain JavaScript object, describing in the minimal way what changed in the application. Whether it is initiated by a network request or by user interaction, any data that gets into the Redux application gets there by actions.

