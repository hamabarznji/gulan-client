import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../utils/withSession";

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user: any = req.session

    res.status(200).json(user.user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
