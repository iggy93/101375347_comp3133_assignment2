// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './graphql/typeDefs.js';
import { mongoose } from 'mongoose';
import { Employees } from './schema/employee.js';
import { User } from './schema/User.js';



const app = express();

const httpServer = http.createServer(app);
mongoose.connect('mongodb+srv://igorDb3133:27JLRztA3kq8qdZV@igordbfs.pnpsamk.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const server = new ApolloServer({
  typeDefs,
   resolvers: {
    Query: {
      hello: () => "Hello World!",
      getAllEmployee: async()=>{
        return await Employees.find({});
      },
      searchById: async (_,args)=>{
        return await Employees.findById(args.id)
      },

      loginUser: async(_,args)=>{
        const users = await User.find().where({
            $and: [
                {
                    $or: [
                        { username: args.username },
                        { email: args.username }
                    ]
                },
                { password: args.password }
            ]
        }).exec();
        if (users.length === 0) {
            return "Verify Username and Password";
        } else {
            return "Success!"; 
        }
      }
    },
    Mutation:{
        addEmployee: async (_,args) =>{
           
            const emp = new Employees(
                {
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: args.gender,
                salary: args.salary,
                }
            )
            try{
               await emp.save();
                return "Employee added successfully!"
            }catch(err){
                return err.message
            }
        },
        signUp: async (_,args)=>{
            const usr = new User({
                ...args
            })
            try{
                await usr.save();
                 return "User Added Successfully!"
             }catch(err){
                 return err.message
             }

        },
        deleteEmployeeById: async (_, args) => {
            try {
                console.log(args._id);
                const employee = await Employees.findByIdAndDelete(args._id);
                console.log(employee)
                if (!employee) {
                    throw new Error("Employee Not Found!");
                }
                return "Employee Removed Successfully";
            } catch (error) {
                console.error("Error Removing Employee!:", error);
                throw error;
            }
        },updateEmployeeById: async (_, args) => {
          
                const emp = {
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary,
                };
        
                const employ= await Employees.findByIdAndUpdate(args._id, emp, { new: true });
               
                console.log(employ)
                if (!employ) {
                    return "Employee Not Found!"
                }
                return "Employee Successfully Updated!";
          
        }
        
        
        
    }
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();


app.use(
  '/',
  cors(),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);


await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(` Server ready at http://localhost:4000/`);