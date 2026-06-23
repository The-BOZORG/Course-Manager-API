export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      const messages = Object.values(errors).flat().filter(Boolean);

      return res.status(400).json({
        message: messages.join(', '),
        errors,
      });
    }

    req.body = result.data;
    next();
  };
};
