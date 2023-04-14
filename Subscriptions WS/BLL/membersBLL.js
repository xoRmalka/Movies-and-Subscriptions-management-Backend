const membersWS = require("../DAL/membersWS");
const memberModel = require("../Models/memberModel");

const getAllMembersAndSave = async () => {
  const { data: memberssData } = await membersWS.getAllMembers();

  const filteredMembers = memberssData.map((member) => ({
    name: member.name,
    email: member.email,
    city: member.address.city,
  }));

  filteredMembers.map(async (member) => {
    const memberObj = new memberModel(member);
    await memberObj.save();
  });

  return "Created";
};
module.exports = {
  getAllMembersAndSave,
};
