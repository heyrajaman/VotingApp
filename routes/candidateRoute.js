const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const { jwtAuthMiddleware, checkAdminRole } = require("../middleware/auth");

router.post(
  "/",
  jwtAuthMiddleware,
  checkAdminRole,
  candidateController.addCandidate
);
router.put(
  "/:candidateId",
  jwtAuthMiddleware,
  checkAdminRole,
  candidateController.updateCandidate
);
router.delete(
  "/:candidateId",
  jwtAuthMiddleware,
  checkAdminRole,
  candidateController.deleteCandidate
);

router.post("/vote/:candidateId", jwtAuthMiddleware, candidateController.vote);

router.get("/vote/count", candidateController.getVoteCount);
router.get("/", candidateController.getAllCandidates);

module.exports = router;
