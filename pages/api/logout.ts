import { withSessionRoute } from "../../utils/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(logout);

async function logout(req: NextApiRequest, res: NextApiResponse, session: any) {
try{
  req.session.destroy();
  res.send({ ok: true });
}
catch(err){
  res.status(500).send(err);

}
}
