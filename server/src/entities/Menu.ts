import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_menu' })
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public store_seq!: number;

  @Column()
  public menu_name!: string;

  @Column()
  public menu_img!: string;

  @Column()
  public menu_grp!: string;

  @Column()
  public menu_desc!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
