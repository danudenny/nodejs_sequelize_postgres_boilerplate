const db = require('../../database/models')
const User = db.User;
const seq = require('sequelize');

// Get All Data
exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll();
    if(data) {
      return res.status(200).send({data});
    } else {
      return res.status(200).send({
        message: 'No data available'
      })
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

// Get User data by ID
// @param : id number
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    if (data) {
      res.status(200).send({
        data
      });
    } else {
      res.status(200).send({
        message: 'No Data available'
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

// Update User
//  @params id
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.update(req.body, {
      where: {
        id : id
      }
    }).then((data) => {
      res.status(200).send({
        message: 'Success edit data',
        data: req.body
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

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({
      where: {
        id: id
      }
    })
    .then(data => {
      if(data == 0) {
        res.status(200).send({
          message: 'Id not found'
        });
      };

      if(data > 0) {
        res.status(200).send({
          message: 'Success Delete User'
        });
      };
    })
    .catch (err => {
      res.status(500).send({
        message: err.message
      })
    })
  } catch (error) {
    
  }
}