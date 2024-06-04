1. Build connection with mongoDB, create a cluser from atlas if necessary, connect to it from 
mongodb compass, and create .env file, install dotenv in development mode, ex : yarn add -D dotenv.
    - Steps to connect to mongoDB :
        * Use an ODM (object data model) like mongoose, the alternative is a mongoDB driver.
        * Use mongoose.connect(uri) (async method) where uri is the connection link to mongoDB database, Use try-catch and throw 
        the errors if any.
        * Then manage mongoose events to manage connections like 
        ```typescript
        mongoose.connection.on("connected", () => {console.log("mongoose connection successful!")});
        ```

2. Create a script for running with and without compiling ts code
    - Steps to create the script:
        * Go to package.json, create a json object called 
        ```json
        "scripts" : { "dev" : "npx ts-node src/index.ts", "build" : "tsc -w"}
        ```
        * Note that "dist" folder is where the compiled ts code will be generated, i.e in tsConfig we have to change outDir : "./dist"

3. Define the types to be used
    - Steps to create a type:
        * Design the interfaces and types you will need for the project, that which forms the basis for the project.
        * For example, to create a mongoDB document type, extend the mongoDB interface with your own structure of the 
        document like - name, description and status. export the types for further usage.

4. Create the mongoDB schema and model.
    - Steps to create a mongoDB schema, model and collection using mongoose:
        * As per your document interface, design the Schema by invoking the Schema class from mongoose. ex :
        ```typescript
        const TodoSchema : Schema = new Schema({object},{timestamps : true}),// don't forget to add timestamps.
        ```
        * Then create the model, i.e collection : 
        ```typescript 
        model<customDocumentInterface>("modelName", modelSchema);
        ```

5. Start writing the controllers for those routes using express:
    - Steps to write different type of controllers:
        * READ all todos :
            * use the mongo model
            ```typescript
            // ITodo is the customDocument interface
            const todos : ITodo[] = await Todo.find()
            ```

        * WRITE a todo : 
            * Get the new todo details from the request body as req.body
            * Invoke the model contructor to create a new todo, then save it
            ``` typescript
                const todo : ITodo = new Todo({
                    name : body.name,
                    description : body.description
                    status : false // default
                });

                const newTodo : ITodo =  await todo.save();
            ``` 

        * UPDATE a todo :
            * Get the new todo details from the request body, and get the id from req.params.id
            * Then use :
            ```typescript
               const updatedTodo : ITodo = await Todo.findByIdAndUpdate(
                    {_id : id},
                    body // whatever object field in the body is updated, ex : {status : true}
                );
            ```
            
        * DELETE a todo :
            * Use delete by id method after getting id from req.params.id:
            ```typescript
                const deletedTodo : ITodo = await Todo.findByIdAndDelete(
                    {_id : id}
                );
            ```

6. Define the routes and their purpose, using express
    - Steps to write routes
        * Import Router class from express, and create an instance of Router.
        * There are four types of routes - get, post, put & delete.
        * Pass in the router's url path (that follows the app server's url), followed by the middlewares and then finally the controller
        ```typescript
            const router : Router = Router();
            router.post("/add-todo", addTodo);
        ```

7. Writing index.ts using express
    - Steps to define the express app with index.ts:
        * It is here we pass the routes and predefined middlewares like express.json(), cors(), etc.
        * It is also here where we define which port to listen from :
        ```typescript
            app.use("/api", todoRoutes);

            app.listen(PORT, () =>
                console.log(`Server running on http://localhost:${PORT}`)
            );
        ```

8. Push the repo to github:
    - Steps to build new branch:
        * copy the current master branch into a new branch
        ```bash
        git checkout -u branch_name
        ```
        * create a new repo in github and copy the remote url shown and follow the steps:
        ```bash
            git remote add origin https://github.com/orewa-arun/todo-app-backend.git
            git branch -M main
            git push -u origin main
        ```
        * Incase you face the error of remote origins:
        ```bash
            git remote set-url origin https://github.com/orewa-arun/todo-app-backend.git
            ##or 
            git remote add origin https://github.com/orewa-arun/todo-app-backend.git
            git push -u origin main
        ```