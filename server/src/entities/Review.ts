import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';

@Entity({ name: 'tb_review' })
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public store_seq!: number;

  @Column()
  public member_seq!: number;

  @Column()
  public phone_number!: string;

  @Column()
  public review_content!: string;

  @Column()
  public review_img1!: string;

  @Column()
  public review_img2!: string;

  @Column()
  public review_img3!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
