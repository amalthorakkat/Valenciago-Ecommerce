const User = require("../models/userModels");

exports.addAddress = async (req, res) => {
  try {
    const { name, street, city, state, zip, country, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isFirst = user.address.length === 0;
    // user.address.forEach((addr) => (addr.isSelected = false)); // Deselect all
    if (user.address.length == 0) {
      user.address.push({
        name,
        street,
        city,
        state,
        zip,
        country,
        phone,
        isSelected: true,
      });
    } else {
      user.address.push({
        name,
        street,
        city,
        state,
        zip,
        country,
        phone,
        isSelected: false,
      });
    }

    await user.save();

    res.status(200).json(user.address);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add address", error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { name, street, city, state, zip, country, phone, isSelected } =
      req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (isSelected) {
      user.address.forEach((addr) => (addr.isSelected = false));
    }

    const address = user.address.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    address.name = name || address.name
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zip = zip || address.zip;
    address.country = country || address.country;
    address.phone = phone || address.phone

    if (typeof isSelected === "boolean") address.isSelected = isSelected;

    await user.save();
    res.status(200).json(user.address);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update address", error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  console.log("test");
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(addressId);
    const deletedWasPrimary = user.address.id(addressId)?.isSelected;
    // user.address.id(addressId)?.remove();
    const updatedAddress = user.address.filter((add) => add._id != addressId);
    user.address = updatedAddress;

    // Set another as primary if the deleted one was selected
    if (deletedWasPrimary && user.address.length > 0) {
      user.address[0].isSelected = true;
    }

    await user.save();
    res.status(200).json(user.address);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete address", error: error.message });
  }
};

exports.getSelectedAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const selected = user.address.find((addr) => addr.isSelected);
    res.status(200).json(selected || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch selected address" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("address");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.address);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get addresses", error: error.message });
  }
};
