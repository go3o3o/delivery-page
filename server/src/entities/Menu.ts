import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';

@Entity({ name: 'tb_menu' })
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public store_seq!: number;

  @Column()
  public menu_name!: string;

  @Column()
  public menu_price!: number;

  @Column()
  public menu_img!: string;

  @Column()
  public main_yn!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
