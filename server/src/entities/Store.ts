import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_store' })
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public store_name!: string;

  @Column()
  public store_location!: string;

  @Column()
  public main_menu!: string;

  @Column()
  public category_seq!: number;

  @Column()
  public logo_img!: string;

  @Column()
  public order_count!: number;

  @Column()
  public steam_count!: number;

  @Column()
  public order_tip!: number;

  @Column()
  public order_time!: number;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
