﻿// <auto-generated />
using System;
using BMDApplication.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BMDApplication.Migrations
{
    [DbContext(typeof(BMDDbContext))]
    [Migration("20240802113728_BookMyDeskInitial")]
    partial class BookMyDeskInitial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("BMDApplication.Models.Booking", b =>
                {
                    b.Property<int>("bookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("bookingId"));

                    b.Property<int>("bookedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("bookedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("bookedFloorNo")
                        .HasColumnType("int");

                    b.Property<int>("bookedFor")
                        .HasColumnType("int");

                    b.Property<int>("bookedSeatNo")
                        .HasColumnType("int");

                    b.Property<DateTime>("updateDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("bookingId");

                    b.HasIndex("bookedBy");

                    b.HasIndex("bookedFor");

                    b.HasIndex("bookedSeatNo");

                    b.ToTable("bookings");
                });

            modelBuilder.Entity("BMDApplication.Models.Role", b =>
                {
                    b.Property<int>("roleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("roleId"));

                    b.Property<string>("roleName")
                        .HasColumnType("longtext");

                    b.HasKey("roleId");

                    b.ToTable("roles");
                });

            modelBuilder.Entity("BMDApplication.Models.Seat", b =>
                {
                    b.Property<int>("seatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("seatId"));

                    b.Property<string>("currentStatus")
                        .HasColumnType("longtext");

                    b.Property<int>("seatFloor")
                        .HasColumnType("int");

                    b.Property<string>("seatName")
                        .HasColumnType("longtext");

                    b.Property<string>("seatType")
                        .HasColumnType("longtext");

                    b.HasKey("seatId");

                    b.ToTable("seats");
                });

            modelBuilder.Entity("BMDApplication.Models.User", b =>
                {
                    b.Property<int>("userId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("userId"));

                    b.Property<string>("emailId")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("phoneNo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("roleFrequency")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("roleId")
                        .HasColumnType("int");

                    b.HasKey("userId");

                    b.HasIndex("roleId");

                    b.ToTable("users");
                });

            modelBuilder.Entity("BMDApplication.Models.Booking", b =>
                {
                    b.HasOne("BMDApplication.Models.User", "bookedByUser")
                        .WithMany("bookings")
                        .HasForeignKey("bookedBy")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BMDApplication.Models.User", "bookedForUser")
                        .WithMany()
                        .HasForeignKey("bookedFor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BMDApplication.Models.Seat", "bookedSeat")
                        .WithMany("bookings")
                        .HasForeignKey("bookedSeatNo")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("bookedByUser");

                    b.Navigation("bookedForUser");

                    b.Navigation("bookedSeat");
                });

            modelBuilder.Entity("BMDApplication.Models.User", b =>
                {
                    b.HasOne("BMDApplication.Models.Role", "role")
                        .WithMany("users")
                        .HasForeignKey("roleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("role");
                });

            modelBuilder.Entity("BMDApplication.Models.Role", b =>
                {
                    b.Navigation("users");
                });

            modelBuilder.Entity("BMDApplication.Models.Seat", b =>
                {
                    b.Navigation("bookings");
                });

            modelBuilder.Entity("BMDApplication.Models.User", b =>
                {
                    b.Navigation("bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
