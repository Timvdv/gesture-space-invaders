// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    const STATUS_SUCCESS = 200;

    res.status(STATUS_SUCCESS).json({ name: 'John Doe' });
};
