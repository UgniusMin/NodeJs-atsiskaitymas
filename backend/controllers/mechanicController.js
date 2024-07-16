const Mechanic = require('../models/mechanic');
const fs = require('fs');
const path = require('path');

exports.createMechanic = async (req, res) => {
  try {
    const { firstName, lastName, specialization, photo, city, serviceId } = req.body;
    const mechanic = await Mechanic.create({ firstName, lastName, specialization, photo, city, serviceId });
    res.status(201).json(mechanic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, specialization, photo, city, serviceId } = req.body;
    const mechanic = await Mechanic.findByPk(id);
    if (!mechanic) {
      return res.status(404).json({ error: 'Mechanic not found' });
    }
    if (photo && mechanic.photo) {
      fs.unlinkSync(path.join(__dirname, '../uploads', mechanic.photo));
    }
    mechanic.firstName = firstName;
    mechanic.lastName = lastName;
    mechanic.specialization = specialization;
    mechanic.photo = photo;
    mechanic.city = city;
    mechanic.serviceId = serviceId;
    await mechanic.save();
    res.status(200).json(mechanic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    const mechanic = await Mechanic.findByPk(id);
    if (!mechanic) {
      return res.status(404).json({ error: 'Mechanic not found' });
    }
    if (mechanic.photo) {
      fs.unlinkSync(path.join(__dirname, '../uploads', mechanic.photo));
    }
    await mechanic.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.findAll();
    res.status(200).json(mechanics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMechanicById = async (req, res) => {
  try {
    const { id } = req.params;
    const mechanic = await Mechanic.findByPk(id);
    if (!mechanic) {
      return res.status(404).json({ error: 'Mechanic not found' });
    }
    res.status(200).json(mechanic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rateMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    const mechanic = await Mechanic.findByPk(id);
    if (!mechanic) {
      return res.status(404).json({ error: 'Mechanic not found' });
    }
    mechanic.rating += 1;
    await mechanic.save();
    res.status(200).json(mechanic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};