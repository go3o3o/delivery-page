import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_menu_option' })
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public menu_seq!: number;

  @Column()
  public menu_option_grp!: string;

  @Column()
  public menu_option!: string;

  @Column()
  public menu_price!: number;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
