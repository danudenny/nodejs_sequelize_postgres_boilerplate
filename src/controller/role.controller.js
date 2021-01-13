const db = require('../../database/models')
const Role = db.Role;

exports.getAll = async (req, res) => {
  try {
    const data = await Role.findAll();
    if (data.length > 0) {
      return res.status(200).send({
        data
      });
    } else {
      return res.status(200).send({
        message: 'No data available'
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

exports.createRole = async (req, res) => {
  try {
    if(!req.body.name) {
      res.status(400).send({
        message : 'Name cannot be empty!'
      });
      return;
    }

    const role = {
      name: req.body.name
    }

    await Role.create(role)
    .then((data) => {
      res.status(200).send({
        message: 'Success create Role',
        data: data
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

exports.getByPk = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          data
        });
      } else {
        res.status(200).send({
          message: 'No id available'
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}