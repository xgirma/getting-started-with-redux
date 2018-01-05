# 02. Describing State Changes with Actions

[<<< 01. The Single Immutable State Tree](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/01)

The second principle of Redux is that the `state tree` is `read only`. _You cannot modify or write to it_. Instead, anytime `you want to change the state`, you need to **dispatch an action**.

        An action is a plain JavaScript object describing the change

An action is a plain JavaScript object describing the change. Just like the state is the minimal representation of the data in your app, the _action is the minimal representation of the change to that data_.

        type property

The structure of the action object is up to you. `The only requirement is that it has a type property`, which is **not undefined**. We suggest using `strings`, because they are serializable.

In different apps, you're going to have different types of actions. For example, in a counter app we only have `INCREMENT` and `DECREMENT` actions. We don't pass any additional information, because this is all that is needed to describe these changes.

[>>> 03. Pure and Impure Functions](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/03)


