import axios from "axios";
import { withSessionRoute } from "../../utils/withSession";
import base_url from '../../url';


export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req: any, res: any) {
  try {
    const { username, password } = req.body;

    const user = await axios.post("http://139.59.238.16:3001/api/users/login", {
      username: username,
      password: password
    });

    if (user.status === 200) {
      req.session.user = {
        username: username,
        role: user.data.role,
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
