package com.abhiram.labAssignment3.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.abhiram.labAssignment3.R;

public class TTS_STT_chooser extends AppCompatActivity {

    Button TTS, STT;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tts__stt_chooser);
        Toast.makeText(TTS_STT_chooser.this, "Login Successfull", Toast.LENGTH_LONG);

        STT = (Button) findViewById(R.id.btn_STT);
        TTS = (Button) findViewById(R.id.btn_TTS);

        STT.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TTS_STT_chooser.this, STT.class);
                startActivity(intent);
            }
        });

        TTS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(TTS_STT_chooser.this, TTS.class);
                startActivity(intent);
            }
        });
    }
}
