import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    //get userId from cookie
    const userId = req.id;

    //get name from body and check
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Feild should not be empty",
        success: false,
      });
    }

    //find compnay already exist or not
    const isCompanyExist = await Company.findOne({ name: companyName });
    if (isCompanyExist) {
      return res.status(400).json({
        message: "Company name already Exist..!",
        success: false,
      });
    }

    //create company
    const newCompany = await Company.create({
      name: companyName,
      userId: userId,
    });

    //send back the response
    res.status(200).json({
      message: "Company Created Successfully..!",
      success: true,
      data: newCompany,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanies = async (req, res) => {
  try {
    //get userid from cookie
    const userId = req.id;

    //find cmp by userId and check
    //finding the companies only which are created by that loggedIn user only
    const companies = await Company.find({ userId });
    if (!companies) {
      res.status(404).json({
        message: "Companies not found..! Create Company..!",
        success: false,
      });
    }

    //send back the response
    res.status(200).json({
      message: "Companies found..!",
      success: true,
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    //get userid from cookies(loggedIn user)
    const userId = req.id;

    //get cmpid from params
    const companyId = req?.params?.companyId;

    //find cmp by cmpId and check
    const company = await Company.findById(companyId);
    if (!company) {
      res.status(404).json({
        message: "Company not found..! Create Company..!",
        success: false,
      });
    }

    //send back the response
    res.status(200).json({
      message: "Company found..!",
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    //get userid from cookies(logedIn user)
    const userId = req.id;

    //get companyId from params
    const companyId = req.params.companyId;

    //get upadated feild form body
    const { description, website, location } = req.body;

    //clodinary comes later
    const file = req.file;

    //update the company with new values and check
    const upadatedData = { description, website, location };
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      upadatedData,
      {
        new: true,
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    //send back the response
    res.status(200).json({
      message: "Company Updated Successfully..!",
      success: true,
      data: updatedCompany,
    });
  } catch (error) {
    console.log(error);
  }
};
