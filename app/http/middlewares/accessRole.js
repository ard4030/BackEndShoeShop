function requireRole(role) {
    return function(req, res, next) {

      const allExist = role.some(value => req.user.Roles.includes(value));
      if (allExist === true) {
        next();
      } else {
        res.status(200).json({
            status:403,
            success:false,
            message:'شما به این قسمت دسترسی ندارید'
        })
      }
    }
  }

  module.exports = {
    requireRole
  }

  first = ['ORDER','USER'];
  second = ['ADMIN','USER','ORDER','SUPERADMIN']