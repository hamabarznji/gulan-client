import axios from "axios";
import { withSessionRoute } from "../../utils/withSession";



export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req: any, res: any) {
  try {
    const { email, password } = req.body;

    const user = await axios.post("http://localhost:3001/api/users/login", {
      email: email,
      password: password
    });

    if (user.status === 200) {
      req.session.user = {
        username: email,
        isAdmin: true,
        id: user.data.id
      };
       await req.session.save();
      res.send({ status: 200, user: user.data });
    } else {
     throw new Error("Invalid credentials");
    }
  } catch (error) {
    return res.status(404).send(error);
  }
}