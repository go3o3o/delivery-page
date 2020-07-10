import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';

@Entity({ name: 'tb_order' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public order_md5!: string;

  @Column()
  public member_seq!: number;

  @Column()
  public menu_seq!: number;

  @Column()
  public order_yn!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
