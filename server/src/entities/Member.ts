import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';

@Entity({ name: 'tb_member' })
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column()
  public phone_number!: string;

  @Column()
  public nickname!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
