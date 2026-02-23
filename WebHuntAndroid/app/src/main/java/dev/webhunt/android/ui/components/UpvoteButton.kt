package dev.webhunt.android.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class UpvoteButtonStyle { Compact, Large }

@Composable
fun UpvoteButton(
    count: Int,
    isUpvoted: Boolean,
    style: UpvoteButtonStyle = UpvoteButtonStyle.Compact,
    onClick: () -> Unit
) {
    val isLarge = style == UpvoteButtonStyle.Large
    val shape = RoundedCornerShape(if (isLarge) 12.dp else 8.dp)
    val primary = MaterialTheme.colorScheme.primary

    Surface(
        onClick = onClick,
        shape = shape,
        color = if (isUpvoted) primary else Color.Transparent,
        border = if (!isUpvoted) BorderStroke(1.5.dp, primary) else null
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(
                horizontal = if (isLarge) 20.dp else 12.dp,
                vertical = if (isLarge) 12.dp else 8.dp
            )
        ) {
            Icon(
                imageVector = Icons.Default.KeyboardArrowUp,
                contentDescription = "Upvote",
                tint = if (isUpvoted) Color.White else primary,
                modifier = Modifier.padding(bottom = if (isLarge) 2.dp else 0.dp)
            )
            Text(
                text = "$count",
                color = if (isUpvoted) Color.White else primary,
                fontWeight = FontWeight.Bold,
                fontSize = if (isLarge) 16.sp else 14.sp
            )
        }
    }
}
