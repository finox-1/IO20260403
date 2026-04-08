import bcrypt from "bcrypt";
import pool from "../../config/database.js";

export const UserTable = {
  async getUserByEmail({ email }) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return rows[0];
  },

  async getUserById({ id }) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    return rows[0];
  },

  async googleCreateUser(profile, email) {
    const hashedPassword = await bcrypt.hash(email, 10);

    const { rows } = await pool.query(
      `
      INSERT INTO users (
        email, 
        first_name,
        last_name,
        role,
        password_hash,
        google_id,
        profile_pic
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [
        email,
        profile.name?.givenName || "Google user",
        profile.name?.familyName || "Google user",
        "user",
        hashedPassword,
        profile.id,
        profile.photos?.[0]?.value || null,
      ]
    );
    return rows[0];
  },

  async getTransparentAccount(year_month) {
    const result = await pool.query(
      `
      SELECT * FROM final_grade WHERE year_month = $1
      `,
      [year_month]
    );

    const { rows } = await pool.query(
      `
        SELECT *
        FROM transparent_account
        WHERE to_char(date, 'YYYY-MM') = $1
        ORDER BY date desc;
    `,
      [year_month]
    );

    return { rows, final_grade: result.rows[0] };
  },
};

export default UserTable;