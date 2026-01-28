import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Details missing" });
    }
    const admin = await adminModel.findOne({ email });
    if (admin)
      return res.json({ success: false, message: "admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({ name, email, password: hashedPassword });
    await newAdmin.save();

    const token = jwt.sign(
      { id: newAdmin._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({ success: true, token, message: "Welcome to Dashboard" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Details missing" });
    }
    const admin = await adminModel.findOne({ email });
    if (!admin)
      return res.json({ success: false, message: "admin does not exists" });

    const token = jwt.sign({ id: admin._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ success: true, token, message: "Welcome to Dashboard" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateBankDetails = async (req, res) => {
  try {
    const { bank, branch, account, ifsc } = req.body;
    const id = req.admin.id;
    const bankDetails = await adminModel.findByIdAndUpdate(
      id,
      { bank, branch, account, ifsc },
      { new: true },
    );
    if (!bankDetails)
      return res.json({ success: false, message: "Something went wrong" });
    res.json({ success: true, message: "Bank Details Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateBusinessDetails = async (req, res) => {
  try {
    const id = req.admin.id;
    const { name, address, phone, gst, pan, msme } = req.body;
    const businessDetails = await adminModel.findByIdAndUpdate(
      id,
      { business: name, address, phone, gst, pan, msme },
      { new: true },
    );
    if (!businessDetails)
      return res.json({ success: false, message: "Something went wrong" });
    res.json({ success: true, message: "Business Details Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateTnc = async (req, res) => {
  try {
    const id = req.admin.id;
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin)
      return res.json({ success: false, message: "Admin not found" });
    res.json({ success: true, message: "Admin removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  adminRegister,
  adminLogin,
  updateBankDetails,
  updateBusinessDetails,
  updateTnc,
};
